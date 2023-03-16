const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

function mergeAlertYamlFiles() {
  // Get the full paths to the YAML files
  const kubeAPIDownPath = path.join(__dirname, 'KubeAPIDown.yaml');
  const kubeNodeDownPath = path.join(__dirname, 'KubeNodeDown.yaml');

  // Read in the contents of the two YAML files
  const kubeAPIDownYaml = fs.readFileSync(kubeAPIDownPath, 'utf8');
  const kubeNodeDownYaml = fs.readFileSync(kubeNodeDownPath, 'utf8');

  // Parse the YAML contents into objects
  const kubeAPIDownObj = yaml.load(kubeAPIDownYaml);
  const kubeNodeDownObj = yaml.load(kubeNodeDownYaml);

  // Merge the two objects together
  kubeAPIDownObj.additionalPrometheusRulesMap[
    'custom-rules'
  ].groups[0].rules.push(kubeNodeDownObj);

  // Convert the merged object back to YAML
  const mergedYaml = yaml.dump(kubeAPIDownObj);

  // Write the merged YAML back to the KubeAPIDown.yaml file
  fs.writeFileSync(kubeAPIDownPath, mergedYaml, 'utf8');

  console.log('Successfully merged YAML files!');
}

mergeAlertYamlFiles();
