import {
  formatFiles,
  generateFiles,
  getProjects,
  installPackagesTask,
  names,
  Tree,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { join } from 'path';

export default async function (host: Tree, schema: any) {
  await libraryGenerator(host, { name: schema.name });
  await formatFiles(host);
  const projects = getProjects(host);
  const project = projects.get(schema.name);

  const formattedNames = names(schema.name);
  await generateFiles(host, join(__dirname, 'files'), project.root, {
    ...formattedNames,
    name: schema.name,
    tmpl: '',
  });

  return () => {
    installPackagesTask(host);
  };
}
