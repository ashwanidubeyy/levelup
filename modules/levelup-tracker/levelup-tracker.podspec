require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "levelup-tracker"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://localhost/levelup"
  s.license      = { :type => "Private" }
  s.authors      = { "LevelUp" => "local" }
  s.platforms    = { :ios => "15.1" }
  s.source       = { :path => "." }
  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.swift_version = "5.0"

  install_modules_dependencies(s)
end
