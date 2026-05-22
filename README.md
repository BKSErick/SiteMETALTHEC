# Site METALTHEC

Site institucional B2B da **METALTHEC** — Fabricação e Manutenção Industrial de Precisão.
João Monlevade · Vale do Aço · MG.

## Estrutura

| Arquivo | Descrição |
|---------|-----------|
| `Metalthec.html` | Página principal (one-page institucional) |
| `blog.html` | Índice do blog técnico |
| `blog-*.html` | Artigos do blog |
| `styles.css` | Estilos do site |
| `app.js` | Interações (nav, scroll reveal, tabs, filtros, form, contadores) |
| `Fotos/` | Imagens (Hero, Fotos catalogo, Logos clientes, Manifesto) |
| `logo.png` | Logotipo |
| `robots.txt` / `sitemap.xml` | SEO |

## Stack

HTML + CSS + JavaScript puro, sem etapa de build. Servir como **site estático**
(GitHub Pages, Cloudflare Pages ou qualquer servidor de arquivos).

> Entrada principal: `Metalthec.html`. Para hospedagem que espera `index.html`,
> renomear/duplicar a página principal ou configurar o entrypoint do provedor.
