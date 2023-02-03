
const wordCapitalize = (name: string): string => {

    return name[0].toUpperCase() + name.substring(1);
    
};

// algunas ideas:
// const firstUnderline...
// const firstBigLetter...
// const textDecorator...

const exportedFunctions = {
    wordCapitalize,

    //firstUnderline,
    //...
};

export default exportedFunctions;