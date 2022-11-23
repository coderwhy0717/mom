// 处理数据 返回想要的数据
export function dataAmend(datas) {
    console.log(datas)
    const edgesa = []
    const nodesa = []  
    for(let item of datas.nodes) {
        console.log(item,"for")
        const texta = item.text.value.split(`\n`)
        const seq =  texta[0].split("：")
        console.log(seq,"text")
        nodesa.push(
            {
                id:item.id,
                Control:item.properties.Control,
                Cepetition: item.properties.Repetition,
                text: texta[1] ?? texta[0],
                Seq: seq[1]
            }
        )
    }
    for(let item of datas.edges) {
        console.log(item,"items")
        edgesa.push(
            {
                sourceNodeId: item.sourceNodeId,
                targetNodeId: item.targetNodeId
            }
        )
    }
    return {edges:edgesa,nodes:nodesa}
}