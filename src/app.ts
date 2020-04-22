function importAll(r: any): any {
  r.keys().forEach(r);
}

importAll(require.context('../src/', true, /\.scss$/));
importAll(require.context('../src/favicon', true, /\.*$/));
importAll(require.context('../src/', true, /\.ts$/));
importAll(require.context('../src/', true, /\.js$/));
