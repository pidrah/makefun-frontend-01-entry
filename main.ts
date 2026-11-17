import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repositoryRoot = dirname(fileURLToPath(import.meta.url));
const destinationRoot = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');

function ensureDirectory(path) {
  try {
    mkdirSync(path, { recursive: true });
  } catch (cause) {
    throw new Error(`Could not create output directory "${path}": ${cause instanceof Error ? cause.message : String(cause)}`);
  }
}

function transferTree(name) {
  const source = join(repositoryRoot, name);
  const destination = join(destinationRoot, name);
  try {
    cpSync(source, destination, { recursive: true, force: true });
  } catch (cause) {
    throw new Error(`Could not copy ${name}/ into "${destination}": ${cause instanceof Error ? cause.message : String(cause)}`);
  }
}

function writeEntryDossier() {
  try {
    const contents = buildDossier(destinationRoot, {
      text_max_bytes: 163840,
      screenshots: { max: 3, max_bytes: 262144 },
      app_max_files: 993,
      app_max_bytes: 16777216,
    });
    // Keep the library's canonical output intact; it is compared byte for byte by the gate.
    writeFileSync(join(destinationRoot, 'dossier.json'), contents);
  } catch (cause) {
    throw new Error(`Could not build dossier.json: ${cause instanceof Error ? cause.message : String(cause)}`);
  }
}

function prepareSubmission() {
  ensureDirectory(destinationRoot);
  ensureDirectory(join(destinationRoot, 'screenshots'));
  transferTree('app');
  transferTree('screenshots');
  writeEntryDossier();
}

try {
  prepareSubmission();
} catch (cause) {
  console.error(`makefun frontend hand-in failed: ${cause instanceof Error ? cause.message : String(cause)}`);
  process.exitCode = 1;
}
