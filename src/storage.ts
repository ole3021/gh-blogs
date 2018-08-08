'use strct'

import { checkInBrowser } from './utils'
const isInBrowser = checkInBrowser()

import PouchDB from 'pouchdb';

interface IStorageModule {
    build(rootPath?: string): Promise<Boolean>
    // load(dbPath: string): Promise<Boolean>
    // getAll(): Promise<Object[]>
    // get(id: string): Promise<Object>
}

export default class Storage implements IStorageModule {
    async build(rootPath?: string): Promise<Boolean> {
        return true
    }
}