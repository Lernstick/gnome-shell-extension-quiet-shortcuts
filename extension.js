const Main = imports.ui.main;
const Meta = imports.gi.Meta;
const ShortcutsDialog = imports.ui.inhibitShortcutsDialog;

let injections = [];
let shortcutDialogs = [];

function injectToFunction(parent, name, func) {
    let origin = parent[name];
    parent[name] = function() {
        let ret;
        ret = func.apply(this, arguments);
        return ret;
    }
    return origin;
}

function removeInjection(object, injection, name) {
    if (injection[name] === undefined)
        delete object[name];
    else
        object[name] = injection[name];
}

function init() {
}

function close() {
    shortcutDialogs[this] = undefined;
}

function open() {
    let shortcutDialog = shortcutDialogs[this];
    let name = shortcutDialog._app ? shortcutDialog._app.get_name() : shortcutDialog._window.title;

    Main.notify(_("“%s” has been granted keyboard shortcuts").format(name));
    shortcutDialog._emitResponse(Meta.InhibitShortcutsDialogResponse.ALLOW);
}

function built() {
    shortcutDialogs[this._dialog] = this;
    injectToFunction(this._dialog, 'open', open);
    injectToFunction(this._dialog, 'close', close);
}

function enable() {
    injections['_buildLayout'] =
        injectToFunction(ShortcutsDialog.InhibitShortcutsDialog.prototype,
                         '_buildLayout', built);
}

function disable() {
    removeInjection(ShortcutsDialog.InhibitShortcutsDialog.prototype,
                    injections, '_buildLayout');
}
