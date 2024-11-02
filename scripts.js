var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
;
(function () {
    var _a;
    var p = function (p) { return document.querySelector(p); };
    function calcTempo(mill) {
        var min = Math.floor(mill / 60000);
        var sec = Math.floor((mill % 60000) / 1000);
        return "".concat(min, "m e ").concat(sec, "s");
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        ;
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        ;
        function adicionar(veiculo, salva) {
            var _a;
            var row = document.createElement('tr');
            row.innerHTML = "\n        <td>".concat(veiculo.nome, "</td>\n        <td>").concat(veiculo.placa, "</td>\n        <td>").concat(veiculo.entrada, "</td>\n        <td>\n            <button class='delete' data-placa=\"").concat(veiculo.placa, "\">X</button>       \n        </td>\n        ");
            row.querySelector('.delete').addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            (_a = p("#patio")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            if (salva)
                salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
        }
        ;
        function remover(placa) {
            var veiculoParaRemover = ler().find(function (veiculo) { return veiculo.placa === placa; });
            if (!veiculoParaRemover)
                return; // Adicione uma verificação aqui
            var entrada = veiculoParaRemover.entrada, nome = veiculoParaRemover.nome;
            var tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm("O ve\u00EDculo ".concat(nome, " permaneceu por ").concat(tempo, ". Deseja encerrar?")))
                return;
            salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
            render();
        }
        function render() {
            p("#patio").innerHTML = '';
            var patio = ler();
            if (patio.length) {
                patio.forEach(function (veiculo) { return adicionar(veiculo); });
            }
        }
        ;
        return { ler: ler, adicionar: adicionar, remover: remover, salvar: salvar, render: render };
    }
    patio().render();
    (_a = p("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var _a, _b;
        var nome = (_a = p('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = p('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        console.log({ nome: nome, placa: placa });
        if (!nome || !placa) {
            alert('Os campos Nome e Placa são obrigatórios.');
            return;
        }
        patio().adicionar({ nome: nome, placa: placa, entrada: new Date().toISOString() }, true);
        p('#nome').value = '';
        p('#placa').value = '';
    });
})();
