#!/usr/bin/env node

import importLocal from 'import-local';
import { log } from '@leon_test_group/utils';
import { filename } from 'dirname-filename-esm'
import entry from '../lib/index.mjs'


if (importLocal(filename(import.meta))) {
  log.info('cli', '使用本地版本')
} else {
  entry(process.argv.slice(2))
}