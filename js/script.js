const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const app = document.getElementById('app');

const templates = {
  sobre: `
    <section class="banner fade-in">
      <img src="imagens/foto650.jpeg" alt="Equipe do Projeto Sorrir Sempre sorrindo" />
    </section>
    <section class="sobre fade-in">
      <h2>Sobre o Projeto</h2>
      <p>
        O <strong>Projeto Sorrir Sempre</strong> oferece cuidados odontológicos gratuitos a comunidades carentes.
        Nosso lema é: <em>“Um sorriso pode não mudar o mundo, mas muda o dia de alguém.”</em>
      </p>
    </section>
    <section class="contato fade-in">
      <h2>Contato</h2>
      <ul>
        <li><strong>Email:</strong> contato@sorrirsempre.org</li>
        <li><strong>Telefone:</strong> (11) 99999-0000</li>
        <li><strong>Endereço:</strong> Rua dos Sorrisos, 100 – São Paulo/SP</li>
      </ul>
    </section>
  `,
  projetos: `
    <section class="projetos fade-in">
      <h2>Projetos Sociais</h2>
      <div class="grid">
        <div class="card">
          <h3>Atendimento Comunitário</h3>
          <p>Serviços odontológicos gratuitos em comunidades vulneráveis.</p>
        </div>
        <div class="card">
          <h3>Doações</h3>
          <p>Recebemos doações de materiais, equipamentos e recursos financeiros.</p>
        </div>
        <div class="card">
          <h3>Voluntariado</h3>
          <p>Profissionais da área da saúde se voluntariam para ajudar no projeto.</p>
        </div>
      </div>
    </section>
  `,
  cadastro: `
    <section class="cadastro fade-in">
      <h2>Cadastro de Voluntário</h2>
      <form id="formCadastro" novalidate>
        <fieldset>
          <legend>Informações Pessoais</legend>
          <label for="nome">Nome Completo:</label>
          <input type="text" id="nome" name="nome" required />

          <label for="email">E-mail:</label>
          <input type="email" id="email" name="email" required />

          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" name="cpf" required pattern="[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}" title="Digite um CPF válido (ex: 000.000.000-00)" />

          <label for="telefone">Telefone:</label>
          <input type="tel" id="telefone" name="telefone" required pattern="\\(?[0-9]{2}\\)?\\s?[0-9]{4,5}-?[0-9]{4}" title="Digite um telefone válido (ex: (11) 99999-9999)" />

          <label for="dataNascimento">Data de Nascimento:</label>
          <input type="date" id="dataNascimento" name="dataNascimento" required />
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <label for="endereco">Endereço:</label>
          <input type="text" id="endereco" name="endereco" required />

          <label for="cep">CEP:</label>
          <input type="text" id="cep" name="cep" required pattern="[0-9]{5}-?[0-9]{3}" title="Digite um CEP válido (ex: 00000-000)" />

          <label for="cidade">Cidade:</label>
          <input type="text" id="cidade" name="cidade" required />

          <label for="estado">Estado:</label>
          <select id="estado" name="estado" required>
            <option value="">Selecione</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
            <option value="ES">Espírito Santo</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Disponibilidade</legend>
          <label for="dias">Dias disponíveis:</label>
          <select id="dias" name="dias" required>
            <option value="">Selecione</option>
            <option value="segunda">Segunda-feira</option>
            <option value="terca">Terça-feira</option>
            <option value="quarta">Quarta-feira</option>
            <option value="quinta">Quinta-feira</option>
            <option value="sexta">Sexta-feira</option>
            <option value="sabado">Sábado</option>
            <option value="domingo">Domingo</option>
          </select>
        </fieldset>

        <button type="submit">Enviar Cadastro</button>
      </form>
    </section>
  `
};

function loadPage(page) {
  app.innerHTML = templates[page];
  navItems.forEach(item => item.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-links a[data-page="${page}"]`);
  if (activeLink) activeLink.classList.add('active');

  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');

  if (page === 'cadastro') setupForm();
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    loadPage(e.target.dataset.page);
  });
});

  function setupForm() {
  const form = document.getElementById('formCadastro');
  const telefoneInput = document.getElementById('telefone');

  telefoneInput.addEventListener('input', e => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 10) val = val.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if (val.length > 5) val = val.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (val.length > 2) val = val.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    else val = val.replace(/^(\d{0,2})/, '($1');
    e.target.value = val;
  });

  form.addEventListener('submit', e => {
    if (!form.checkValidity()) {
      e.preventDefault();
      alert('Por favor, preencha todos os campos corretamente.');
    } else {
      e.preventDefault();
      alert('Cadastro enviado com sucesso!');
      form.reset();
    }
  });
}

loadPage('sobre');
