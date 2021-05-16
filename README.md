# git-proxy-switcher

We use some tools to proxy git usually, because the speed is very slow while we visit github, but sometimes there are multiple agents in our system that need to be switched and it is very inconvenient for us to use. so, I made this tool to switch agents quickly.

## usage

Follow the steps:

1. clone to local and Run `yarn install` (nonsense)
2. use `yarn run start:all` command to get into development mode
3. use `yarn run electron:pack` command to pack the application, and then the `release` folder would be generated in root of project.

## PS
1. now only support window
2. access the exe-application（`git-proxy-switcher.exe`）in `release/win-unpacked/` folder.



