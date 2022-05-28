import React, { useState } from 'react';
import Button from '../components/Button';

export default function Home() {
  const [chat, setChat] = useState(false);
  const [word, setWord] = useState('');
  const [options, setOptions] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [buttonClick, setButtonClick] = useState('');

  const callApi = async (keyWordInput) => {
    await fetch('/keyword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyWord: keyWordInput }),
    })
      .then((res) => res.json())
      .then((json) => {
        setButtons(
          json.tests.filter(({ keyWord }) => keyWord.toLowerCase() === keyWordInput.toLowerCase()),
        );
        setOptions(true);
      });
  };

  return (
    <>
      {
        chat
          ? (
            <div>
              {
                options ? (
                  <div>
                    <div>
                      {
                        buttons.length !== 0 ? buttons.map(({ command }) => (
                          <Button name={command} func={() => setButtonClick(command)} />
                        )) : (<p>Palavra chave não encontrada</p>)
                      }
                    </div>
                    <div>
                      {
                        buttons.filter(({ command }) => command === buttonClick)
                          .map(({ instructions }) => (
                            <p>{instructions}</p>
                          ))
                      }
                    </div>
                    <div>
                      <Button name="Fale com Atendente" />
                    </div>
                  </div>
                ) : null
              }
              <div>
                <p>Digite uma palvra chave e click em enviar para receber as opções:</p>
              </div>
              <input type="text" onChange={({ target }) => setWord(target.value)} value={word} />
              <Button name="enviar" func={() => { callApi(word); }} />
              <Button name="Finalizar" func={() => setOptions(false)} />
            </div>
          ) : null
      }
      <div>
        <Button name="Fale Conosco" func={() => setChat(!chat)} />
      </div>
    </>
  );
}
