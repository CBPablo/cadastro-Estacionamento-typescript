interface Veiculo {
    nome:string ;
    placa:string ;
    entrada:Date | string;
};

(function(){
const p = (p:string):HTMLInputElement |null => document.querySelector(p)

function calcTempo(mill:number){
const min = Math.floor(mill / 60000);
const sec = Math.floor((mill % 60000) / 1000);
return `${min}m e ${sec}s`
}
function patio(){
    function ler ():Veiculo[]{
    return localStorage.patio ? JSON.parse(localStorage.patio) :[]
    };

    function salvar(veiculos:Veiculo[]){
        localStorage.setItem('patio', JSON.stringify(veiculos))
    };

    function adicionar(veiculo:Veiculo, salva?:boolean){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${veiculo.nome}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td>
            <button class='delete' data-placa="${veiculo.placa}">X</button>       
        </td>
        `;

        row.querySelector('.delete').addEventListener('click', function(){
            remover(this.dataset.placa)
        });

        p("#patio")?.appendChild(row)

        if(salva)salvar([...ler(), veiculo])
        
    };
    function remover(placa: string) {
        const veiculoParaRemover = ler().find(veiculo => veiculo.placa === placa);
        if (!veiculoParaRemover) return; // Adicione uma verificação aqui
    
        const { entrada, nome } = veiculoParaRemover;
        const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
        
        if (!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar?`)) return;
    
        salvar(ler().filter(veiculo => veiculo.placa !== placa));
        render();
    }

    function render(){
        p("#patio")!.innerHTML = ''
        const patio = ler();
        if(patio.length){
            patio.forEach((veiculo) => adicionar(veiculo));
        }
    };


return {ler, adicionar,remover, salvar, render};
}
patio().render()

p("#cadastrar")?.addEventListener('click',()=>{
   const nome = p('#nome')?.value
   const placa = p('#placa')?.value
   console.log({nome,placa})

   if(!nome || !placa){
    alert('Os campos Nome e Placa são obrigatórios.')
    return;
   }

   patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
   
   p('#nome')!.value = ''
   p('#placa')!.value = ''
});
})();