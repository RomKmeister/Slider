function importAll (r: any) {
  r.keys().forEach(r);
}

importAll(require.context('../src/', false, /\.scss$/));
importAll(require.context('../src/', true, /\.scss$/));
importAll(require.context('../src/', true, /\.ts$/));
