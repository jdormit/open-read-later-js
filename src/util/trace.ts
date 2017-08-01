type trace<T> = (label: string) => (v: T) => T;
const trace: trace<any> = label => v => {
    const prettyV = JSON.stringify(v, null, '\t');
    console.log(`${label}: ${prettyV}`);
    return v;
}

export default trace;
