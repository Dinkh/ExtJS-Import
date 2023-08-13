Ext.define('GetterSetter.util.Import', {
    singleton: true,

    /**
     * @event importedmodule
     * GlobalEvent:
     * After imported Module
     * @param {String} ModuleName
     */
    /**
     * @event importsload
     * GlobalEvent:
     * All Modules from the manifest are imported
     */

    constructor() {
        const me = this;

        me.init();
        me.addImportListener();
        me.importModules();
    },

    /**
     * Initialize import
     */
    init() {
        Ext.imports = Ext.imports || {};
        this.counter = 0;
        this.toLoadModules = 0;
    },

    /**
     * After each module got imported it fires `imported`.
     * We listen for this to fire `importsload` once all imports
     * have been loaded.
     */
    addImportListener() {
        const me = this;

        Ext.on('importedmodule', function() {
            me.counter++;

            if (me.counter === me.toLoadModules) {
                Ext.fireEvent('importsload');

                delete me.counter;
                delete me.toLoadModules;
            }
        })
    },

    /**
     * Get the modules from the manifest and start importing them
     */
    importModules() {
        const me = this,
              modules    = Ext.manifest.modules;

        me.toLoadModules = modules.length;

        for (const item of modules) {
            ExtImporter(item);
        }
    }
});
