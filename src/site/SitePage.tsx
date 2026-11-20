import { Link } from 'react-router-dom'
import SiteHeader from './SiteHeader'
import OrcamentoForm from './OrcamentoForm'
import { depoimentos, galeria, servicos } from '../data/conteudo'
import hero from '../assets/hero.jpg'
import monograma from '../assets/monograma.png'

export default function SitePage() {
  return (
    <>
      <SiteHeader />
      <main id="topo">
        <section className="hero">
          <img className="hero-img" src={hero} alt="" />
          <div className="hero-inner">
            <p className="hero-eyebrow">BUFFET COMPLETO DESDE 1996</p>
            <h1>
              Mais que sabores,
              <em>Memórias inesquecíveis</em>
            </h1>
            <p>Casamentos, eventos corporativos e celebrações especiais com a dedicação de quem trata cada evento como se fosse da própria família.</p>
            <div className="hero-actions">
              <a href="#contato" className="btn btn-gold">Solicitar orçamento</a>
              <a href="#galeria" className="btn btn-ghost">Ver galeria →</a>
            </div>
          </div>
        </section>

        <section id="quem-somos" className="section">
          <div className="section-inner about">
            <div>
              <h2 className="section-title">Quem Somos</h2>
              <p>Tudo começou com pequenos jantares feitos em casa pelo Sr. Orlando e Dona Irene.</p>
              <p>O cuidado com a comida, a hospitalidade e a dedicação conquistaram amigos, depois famílias, empresas e grandes eventos.</p>
              <p>Hoje, sob a liderança de Adriano, a Só Festas continua crescendo sem perder sua essência: servir pessoas com excelência, atenção aos detalhes e paixão pelo que faz.</p>
              <p>Porque um grande evento não é apenas sobre servir alimentos. É sobre criar momentos que permanecem na memória.</p>
            </div>
            <img className="about-mark" src={monograma} alt="Monograma SF da Só Festas" />
          </div>
        </section>

        <section id="galeria" className="section">
          <div className="section-inner">
            <h2 className="section-title gallery-title">
              Experiências que vão além do <span className="gold-text">Buffet</span>
            </h2>
            <div className="gallery">
              {galeria.map((g) => (
                <figure key={g.src}><img src={g.src} alt={g.alt} loading="lazy" /></figure>
              ))}
            </div>
          </div>
        </section>

        <section id="servicos" className="section">
          <div className="section-inner">
            <h2 className="section-title">Serviços</h2>
            <div className="cards">
              {servicos.map((s) => (
                <div className="card-line" key={s.titulo}><h3>{s.titulo}</h3><p>{s.texto}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="depoimentos" className="section">
          <div className="section-inner">
            <h2 className="section-title">Depoimentos</h2>
            <div className="cards">
              {depoimentos.map((d, i) => (
                <div className="card-line" key={i}><p className="quote">“{d.texto}”</p><span className="quote-by">{d.autor}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="section">
          <div className="section-inner contact">
            <div>
              <h2 className="section-title">Vamos planejar o seu evento</h2>
              <p>Conte o que você tem em mente e retornamos com uma proposta para o seu evento.</p>
            </div>
            <OrcamentoForm />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} Só Festas
        <Link to="/painel">Área restrita</Link>
      </footer>
    </>
  )
}
