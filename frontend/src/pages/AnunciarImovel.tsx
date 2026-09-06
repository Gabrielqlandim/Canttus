import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { criarImovel, adicionarFotoImovel } from '../api/imoveis';

export function AnunciarImovel() {
    const estaLogado = !!localStorage.getItem('access_token');
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [diaria, setDiaria] = useState('');
    const [maxHospedes, setMaxHospedes] = useState(1);
    const [foto, setFoto] = useState<File | null>(null);

    if (!estaLogado) return <Navigate to="/login" />;

    async function handleSubmit(evento: React.FormEvent) {
        evento.preventDefault();
        try {
            const imovel = await criarImovel({
                titulo,
                descricao,
                endereco,
                cidade,
                diaria,
                max_hospedes: maxHospedes,
                publicado: true,
            });

            if (foto) {
                try {
                    await adicionarFotoImovel(imovel.id, foto);
                } catch {
                    toast.error('Imóvel criado, mas a foto não pôde ser enviada.');
                }
            }

            toast.success('Imóvel anunciado com sucesso!');
            navigate(`/imoveis/${imovel.id}`);
        } catch {
            toast.error('Não foi possível anunciar o imóvel. Confira os dados e tente de novo.');
        }
    }

    return (
        <div className="max-w-lg mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Anunciar imóvel</h1>
            <p className="text-sm text-gray-500 mb-6">Preencha os dados do seu imóvel para publicá-lo no Canttus.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título (ex: Apartamento na Praia)"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição"
                    rows={3}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Cidade"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <input value={diaria} onChange={(e) => setDiaria(e.target.value)} placeholder="Diária, em R$ (ex: 250.00)"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                <label className="text-sm text-gray-600">
                    Máximo de hóspedes
                    <input type="number" min={1} value={maxHospedes} onChange={(e) => setMaxHospedes(Number(e.target.value))}
                        className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </label>
                <label className="text-sm text-gray-600">
                    Foto do imóvel
                    <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files?.[0] ?? null)}
                        className="w-full mt-1 text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                </label>
                <button type="submit" className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg">
                    Publicar anúncio
                </button>
            </form>
        </div>
    );
}
