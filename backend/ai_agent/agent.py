from pydantic_ai import Agent
from listings.models import Imovel

agent = Agent(
    'google:gemini-3.6-flash',
    system_prompt=(
        "Você é o Canttinhus, assistente virtual do Canttus, um site de aluguel de imóveis por temporada. "
        "Ajude o usuário a encontrar um imóvel adequado usando a ferramenta buscar_imoveis. "
        "Responda em português, de forma curta, clara e amigável — isso aparece dentro de um "
        "widget de chat pequeno, então evite respostas longas ou muito formatadas: no máximo 3-4 "
        "linhas de texto corrido, ou uma lista bem curta (até 3 itens) só quando fizer sentido. "
        "Se a pergunta não tiver relação com a busca de imóveis no Canttus, explique educadamente "
        "que só pode ajudar com isso."
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