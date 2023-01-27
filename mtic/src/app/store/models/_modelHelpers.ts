export const getContent: (content: any) => string = ((content: any): string => {
    if (!content) {
        return '';
    }
    if (typeof content === 'string') {
        return content;
    }
    const a: string[] = content;
    if (!content?.length) {
        return '';
    }
    const result = a.reduce((prev, current) => `${prev}${prev.endsWith('>') ? '' : '\r\n'}${current.startsWith('|') ? '' : '\r\n'}${current}`);
    return result;
});

export const cleanupContent: (content: any) => string = ((content: any): string => content.replace(/#|\<[^\>]*\>|--readmore--|&[^;]*;|\|/g, ''));
