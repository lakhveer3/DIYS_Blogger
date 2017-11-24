var config = {
   entry: './main.js',
   output: {
      path:__dirname+'/',
      filename: 'index.js',
   },
   devServer: {
      inline: true,
      port: 8181
   },
   module: {
      loaders: [
         {
            test: [/\.jsx?$/,/\.js?$/],
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
			  test: /\.css$/,
			  loader: 'style-loader!css-loader'
			},
      {
			 test: /\.(jpe?g|gif|png)$/,
			 loader: 'file-loader?emitFile=false&name=./client/assets/images/[name].[ext]'
			}
      ]
   }
}
module.exports = config;
