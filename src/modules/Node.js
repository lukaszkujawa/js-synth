
import Tone from 'tone'


export const chain = (n, ...args) => {
    const node = n.node()

    node.chain(...args.map(n => n.node()))

    return node
}


export const connect = (n1, n2) => n1.node().connect(n2.node())
