project('quiet-shortcuts-gnome-shell-extension',
  version: '0.0.1',
  meson_version: '>= 0.44.0',
  license: 'GPL2+'
)

datadir = get_option('datadir')

uuid = 'quiet-shortcuts@fourdan.gmail.com'
shelldir = join_paths(datadir, 'gnome-shell')
extensiondir = join_paths(shelldir, 'extensions')
installdir = join_paths(extensiondir, uuid)

sources = files(['extension.js','metadata.json'])

conf_data = configuration_data()
conf_data.set('name', meson.project_name())
conf_data.set('version', meson.project_version())
conf_data.set('uuid', uuid)
conf_data.set('installdir', installdir)
configure_file(input: 'gnome-shell-extension-quiet-shortcuts.spec.in',
               output: 'gnome-shell-extension-quiet-shortcuts.spec',
               configuration: conf_data)

install_data (sources, install_dir: installdir)
