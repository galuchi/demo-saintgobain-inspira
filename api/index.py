import os
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Pydantic Models ──────────────────────────────────────────────────────────

class IdeaInput(BaseModel):
    titulo: str = Field(..., max_length=100)
    descricao: str = Field(..., max_length=1000)
    problema: str = Field(..., max_length=500)


class IdeaOutput(BaseModel):
    score: int
    improved_title: str
    improved_description: str
    tips: list[str]


# ── Fallback realista para a demo ────────────────────────────────────────────

FALLBACK_RESPONSE = IdeaOutput(
    score=76,
    improved_title="Reaproveitamento de resíduos na produção de placas de gesso",
    improved_description=(
        "Minha ideia é criar um processo para reaproveitar os resíduos de gesso "
        "gerados na linha de produção, transformando-os em matéria-prima para novos "
        "produtos. Isso pode reduzir o volume de descarte, diminuir custos e contribuir "
        "para as metas de sustentabilidade da Saint Gobain."
    ),
    tips=[
        "Descreva mais o ganho esperado",
        "Explique o impacto da ideia em custo e sustentabilidade",
    ],
)

SYSTEM_PROMPT = """Você é o Assistente Inspira da Saint Gobain, especialista sênior em 
Lean Manufacturing, Inovação Industrial e Sustentabilidade.

Sua missão é aprimorar ideias de colaboradores das fábricas Saint Gobain, tornando-as 
mais claras, impactantes e aderentes aos pilares estratégicos da empresa: 
sustentabilidade, redução de desperdício (Zero Waste), eficiência energética e criação 
de valor para clientes.

Ao receber uma ideia, você deve:
1. Avaliar o score de aderência estratégica (0-100), onde 100 é uma ideia perfeita.
2. Reescrever o título de forma concisa e impactante (máx. 80 chars).
3. Reescrever a descrição com linguagem profissional, destacando sustentabilidade e 
   impacto nos processos produtivos (máx. 400 chars).
4. Fornecer exatamente 2 a 3 dicas práticas e específicas para aumentar o score.

Responda SOMENTE com um JSON válido no seguinte formato:
{
  "score": <int 0-100>,
  "improved_title": "<string>",
  "improved_description": "<string>",
  "tips": ["<dica1>", "<dica2>"]
}"""


# ── Endpoint ─────────────────────────────────────────────────────────────────

@app.post("/api/inspira", response_model=IdeaOutput)
async def inspira(idea: IdeaInput) -> IdeaOutput:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return FALLBACK_RESPONSE

    try:
        from openai import OpenAI

        client = OpenAI(api_key=api_key, timeout=20.0)

        user_message = (
            f"Título: {idea.titulo}\n"
            f"Descrição: {idea.descricao}\n"
            f"Problema que resolve: {idea.problema}"
        )

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            temperature=0.7,
            max_tokens=600,
        )

        raw = response.choices[0].message.content or "{}"
        data = json.loads(raw)

        return IdeaOutput(
            score=int(data.get("score", 70)),
            improved_title=str(data.get("improved_title", idea.titulo)),
            improved_description=str(data.get("improved_description", idea.descricao)),
            tips=list(data.get("tips", [])),
        )

    except Exception:
        return FALLBACK_RESPONSE


# ── Health check ─────────────────────────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "Inspira API"}
