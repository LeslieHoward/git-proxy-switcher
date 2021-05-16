import _ from 'lodash';
import moment from 'moment';
import type { ObjectType } from './types';

export const phoneRE = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
export const urlRE = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const specialSymbolRE = /[`~!@#$%^&*()_\-+=|{}':;',[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]/;

export function isValidPhone(value: any) {
  return phoneRE.test(value);
}

export function isUrl(path: string): boolean {
  return urlRE.test(path);
}

export function isSpecialSymbol(value: any) {
  return specialSymbolRE.test(value);
}

export function isImage(value: any): boolean {
  return /.*\.(gif|jpe?g|bmp|png|webp|tiff?|emf|heic|raw)$/gim.test(value);
}

export function isAntDesignPro(): boolean {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntDesignProOrDev(): boolean {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
}

export function isAmbiguous(value: any): boolean {
  return /^(?:undefined|null)$/.test(value) || _.isNil(value) || _.isNaN(value) || value === '';
}

export function isVaccum(value: any): boolean {
  return isAmbiguous(value) || _.size(value) === 0;
}

export function isSomeVaccum(value: any, predicate: (obj: any) => boolean = isVaccum): boolean {
  return _.some(value, (element) =>
    _.isObject(element) ? isSomeVaccum(element, predicate) : predicate(element),
  );
}

export function isAllVaccum(value: any, predicate: (obj: any) => boolean = isVaccum): boolean {
  return _.every(value, (element) =>
    _.isObject(element) ? isAllVaccum(element, predicate) : predicate(element),
  );
}

export function safeGet(target: any, path: any, defaults?: any): any {
  return _.defaultTo(_.get(target, path), defaults);
}

export function safeParse(value: any, defaults?: any) {
  const result = _.attempt((source) => JSON.parse(source), value);
  return _.isError(result) || isAmbiguous(result) ? defaults : result;
}

export function alterGet(
  target: any,
  predicate: (obj: any, key: any) => boolean = (value: any) => {
    return !isAmbiguous(value);
  },
) {
  return _.find(target, (item, index) => predicate(item, index));
}

export function safeMomentize(value: any, defaults?: any): any {
  if (!value) {
    return defaults;
  }
  const momentize = moment(value);
  return momentize.isValid() ? momentize : defaults;
}

export function safeMomentFormat(value: any, pattern: string): string {
  const momentize = safeMomentize(value);
  return momentize ? momentize.format(pattern) : '';
}

export function generateQueryMap(map: Record<string, any>, separator = '|') {
  return _.reduce(
    map,
    (acc, value, keysString) => {
      const keys = _.split(keysString, separator);
      _.forEach(keys, (key) => {
        acc[key] = value;
      });
      return acc;
    },
    {} as Record<string, any>,
  );
}

/**
 * 转换一个数组类型的路径为字符串类型的路径
 * @param path ['info', 0, 'name']
 */
export function joinPath(path: any[]) {
  return _.reduce(
    path,
    (buffer, item) => {
      if (typeof item === 'string') {
        buffer = `${buffer}.${item}`;
      } else if (typeof item === 'number') {
        buffer = `${buffer}[${item}]`;
      }
      return buffer;
    },
    '',
  ).replace(/^[.]|[.]$/g, '');
}


export function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export function catchWith(promise: Promise<any>) {
  return promise.then((data) => ({ data, error: null })).catch((error) => ({ data: null, error }));
}

// 处理表单数据
export function processFormData(data: any, options: ObjectType) {
  const { handlers, base = {}, path = [], deeper = false } = options;
  return _.reduce(
    data,
    (buffer, value, key) => {
      const concatedPath = _.concat(path, key);
      const joinedPath = joinPath(concatedPath);
      const newOptions: ObjectType = {
        ...options,
        path: concatedPath,
        pathString: joinedPath,
      };
      const isArray = _.isArray(value);
      const isPlainObject = _.isPlainObject(value);

      let isDeep = deeper;

      if (typeof deeper === 'function') {
        isDeep = deeper(value, key, newOptions);
      } else if (_.isRegExp(deeper)) {
        isDeep = deeper.test(joinedPath);
      }

      if (isDeep && (isArray || isPlainObject)) {
        newOptions.base = isArray ? [] : {};
        buffer[key] = processFormData(value, newOptions);
      } else {
        buffer[key] = handleSingle(value, key, newOptions);
      }
      return buffer;
    },
    base,
  );

  function handleSingle(value: any, key: any, options: ObjectType) {
    const { pathString } = options;
    const [, handler] =
      _.find(handlers, ([matcher]) => {
        if (typeof matcher === 'function') {
          return matcher(value, key, options);
        }
        if (_.isRegExp(matcher)) {
          return matcher.test(pathString);
        }
        return matcher === pathString;
      }) || [];

    if (typeof handler === 'function') {
      return handler(value, key, options);
    }
    return value;
  }
}

// 数组排序
export function sortInMap(
  target: any[] | ObjectType,
  seqMap: Record<string, number>,
  seqKey?: any,
): any[] {
  return _.chain(target)
    .reduce((buffer: any[], item: any, key: any) => {
      if (item[seqKey] in seqMap || key in seqMap) {
        const seq = seqKey ? seqMap[item[seqKey]] : key;
        buffer.splice(seq, 0, item);
      } else {
        buffer.push(item);
      }
      return buffer;
    }, [])
    .compact()
    .value();
}

// 获取字母表 65

/**
 * 获取字母表
 * @returns string[]
 */
export function getAllChars(startChar: 65 | 97 = 97): string[] {
  const allChars = [];
  for (let i = 0; i < 26; i += 1) {
    allChars.push(String.fromCharCode(startChar + i));
  }
  return allChars;
}


