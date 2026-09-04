from pydantic_ai import Agent
from listings.models import Imovel

agent = Agent(
    'google:gemini-3.6-flash',
    system_prompt=(
        "Você é o assistente virtual do Canttus, um site de aluguel de imóveis por temporada."
        "Ajude o usuário a encontrar um imovel adequado usando a ferramenta buscar_imoveis."
        "Responda em portugês de forma clara e amigável."
        "Se a pergunta não tiver relação com a busca de imveis no Canttus, explique educadamente."
        "que so pode ajudar com isso"
    ),
)

@agent.tool_plain
def buscar_imoveis(cidade: str | None= None, preco_max: float | None = None, hospedes_min: int | None = None)-> list[dict]:
    """Busca imóveis publicados, filtrando por cidade, preço máximo da diária e número mínimo de hóspedes."""
    queryset = Imovel.objects.filter(publicado = True)

    if cidade:
        queryset = queryset.filter(cidade__icontains=cidade)
    if preco_max:
        queryset = queryset.filter(diaria__lte=preco_max)
    if hospedes_min:
        queryset = queryset.filter(max_hospedes__gte=hospedes_min)

    return [
        {
            'titulo': imovel.titulo,
            'cidade': imovel.cidade,
            'diaria': str(imovel.diaria),
            'max_hospedes': imovel.max_hospedes,
        }
        for imovel in queryset[:10]
    ]