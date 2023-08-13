window.ExtImporter = function (item) {
    const path = '../../' + item.path;

    import(path).then(module => {
        let namespace = item.global ? window : Ext.imports,
            moduleName;

        if (item.default) {
            moduleName            = item.name || module.default.name;
            namespace[moduleName] = module.default;
        } else {
            moduleName            = item.name || Ext.warn('[Modules.load] in app.json you are using a non default module without name');
            namespace[moduleName] = module;
        }

        Ext.fireEvent('importedmodule', moduleName);
    })
}
