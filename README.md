# digo-postcss
[digo](https://github.com/digojs/digo) 插件：使用 [PostCSS](https://github.com/postcss/postcss) 优化 CSS。

如果您只需要使用 [AutoPrefixer](https://github.com/postcss/autoprefixer)，可以考虑使用 [digo-autoprefixer](https://github.com/digojs/digo-autoprefixer) 插件。

## 安装
```bash
npm install digo-postcss -g
```

### 安装常用 PostCSS 插件
```bash
npm install autoprefixer precss -g
```

## 用法
### 优化 CSS
```js
digo.src("*.css").pipe("digo-postcss", {
	processors: [
		require('autoprefixer'), 
		require('precss')
	]
});
```

### 源映射(Source Map)
本插件支持生成源映射，详见 [源映射](https://github.com/digojs/digo/wiki/源映射)。

## 选项
```js
digo.src("*.css").pipe("digo-postcss", {
	processors: [					// 指定各个 PostCSS 处理器插件。[2]
		require('autoprefixer')({}),// autoprefixer 配置。
		require('precss')({})   	// precss 配置。
	],
	from: "",						// 源文件路径。[1]
	to: "",							// 目标文件路径。[1]
	map: null,						// 是否生成源映射。是否生成源映射。具体见 [map](https://github.com/postcss/postcss/blob/master/docs/source-maps.md)。[1]
	parser: null,					// 自定义 CSS 解析器。如 [SCSS](https://github.com/postcss/postcss-scss)。
	stringifier: null,				// 自定义 CSS 生成器。如 [Midas](https://github.com/ben-eb/midas)。
	syntax: null,					// 同时包含 parser 和 stringifier 的 JSON 对象。
});
```

> [1]: 插件内部已重设了此配置的默认值。
> [2]: 此配置由插件提供。

另参考: [https://github.com/postcss/postcss](https://github.com/postcss/postcss)。
