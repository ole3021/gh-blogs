'use strict'

import { IFileInfo } from './utils/files'

interface IBlog {
    title: String
    content: String
    meta: Object
    fileInfo: IFileInfo
}

interface IBlogsModule {
    initWithFileInfo(info: IFileInfo[]): Promise<IBlog[]>
}

export default class Blogs implements IBlogsModule {
    constructor(private blogs: IBlog[] = [], fileInfo: IFileInfo[]) {

    }
    private loadBlog(filePaht: string): Promise<IBlog> {
        // const meta = yamlFront.loadFront(fs.readFileSync(blogFilePath))
        // // TODO: load content
        // // const content = marked(meta.__content);

        // delete meta.__content
        // return { meta }
        return Promise.resolve()
    }

    private name2Id(name: String): String {
        const result = name.replace(/[\W_]+/g, '-')
        if (name.length != result.length) return sh.unique(name) // Non alphaBet name will convert to short hashId
        return result
    }

    initWithFileInfo(info: IFileInfo[]): Promise<IBlog[]> {
        return Promise.resolve([])
    }
}
