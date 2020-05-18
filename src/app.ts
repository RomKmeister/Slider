function requireAll(r: any): void {
  r.keys().forEach(r);
}

requireAll(require.context('../src/', true, /\.scss$/));
requireAll(require.context('../src/favicon', true, /\.*$/));
requireAll(require.context('../src/', true, /\.ts$/));
requireAll(require.context('../src/', true, /\.js$/));
