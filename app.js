const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors'); // Importa la biblioteca cors
require('dotenv').config();

const correo = process.env.CORREO;
const password = process.env.PASSWORD

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: correo,
      pass: password
    }
  });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.post('/send', (req, res) => {
    const { nombre, mail, message } = req.body;
    console.log(`Nombre: ${nombre}, Email: ${mail}, Mensaje: ${message}`);
  
    // Definir el contenido del correo electrónico
    const mailOptions = {
      from: mail,
      to: mail,
      subject: nombre,
      text: `Mensaje de ${nombre}: \n Correo : ${mail} \n Mensaje : ${message}`
    };
  
    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).send('Error al enviar el correo electrónico');
      } else {
        console.log('Correo electrónico enviado:', info.response);
        res.send('Correo electrónico enviado correctamente');
      }
    });
  });
  


// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en el puerto ${PORT}`);
});
