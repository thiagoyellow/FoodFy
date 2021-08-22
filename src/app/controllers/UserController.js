const { hash } = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const User = require('../models/User')

module.exports = {
    registerForm(req, res) {
        return res.render('admin/users/register')
    },
    async post(req, res) {
        try {
            const password = crypto.randomBytes(5).toString('hex')
            const newPassword = await hash(password, 8)

            if(req.body.is_admin == undefined)
                req.body.is_admin = false
  
            await User.create({
                ...req.body,
                password: newPassword,
            })

            await mailer.sendMail({
                to: req.body.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Acessar o sistema', 
                html: `<h2 style="font-size: 24px; font-weight: normal;">Olá <strong>${req.body.name}</strong>,</h2>
                <p>Seja muito bem-vindo(a) ao <strong>Foodfy</strong> :)</p>
                <p>Seu cadastro foi realizado com sucesso! Confira seus dados:</p>
                <p>Login: ${req.body.email}</p>
                <p>Senha: ${password}</p>
                <br>
                <h3>Como eu acesso minha Conta?</h3>
                <p>
                    Bem simples, você só precisa clicar no botão abaixo e entrar com seu email e senha informados acima.
				</p>
				<p style="text-align: center;">
                    <a
                        style="display: block; margin: 32px auto; padding: 16px; width:150px; color: #fff;
                        background-color: #6558C3; text-decoration: none; border-radius: 4px;"
                        href="http://localhost:3000/login" target="_blank"
                    >Acessar</a> 
				</p>
                <p style="padding-top:16px; border-top: 2px solid #ccc">Te esperamos lá!</p>
                <p>Equipe Foodfy.</p>
            `,
            })

            req.session.success = 'Conta criada com sucesso.'
            return res.redirect('/admin/users')
        }catch(error) {
            console.log(error)
            return res.render('admin/users/register', {
                error: 'Algo deu errado.'
            })
        }
    },
    async list(req, res) {
        try {
            const users = await User.findAll()

            const { error, success } = req.session
            req.session.error = ''
            req.session.success = ''

            return res.render('admin/users/index', { users, error, success })
        } catch (error) {
            console.log(error)
            return res.render('admin/users/index', { 
                error: 'Algo deu errado.'
            })
        }
    },
    async show(req, res) {
        try {
            const { user, session: {error, success} } = req
            req.session.error = ''
            req.session.success = ''

            return res.render('admin/users/show', { user, error, success })
        } catch (error) {
            console.log(error)
            return res.render('admin/users/show', { 
                error: 'Algo deu errado.'
            })
        }
    },
    async put(req, res) {
        try {
            let { name, email, is_admin } = req.body

            if(is_admin == null) 
                is_admin = false
            
            await User.update(req.body.id, {
                name,
                email,
                is_admin
            })

            req.session.success = 'Conta atualizada com sucesso.'
            return res.redirect(`/admin/users/${req.body.id}`)
        }catch(error) {
            console.log(error)
            return res.render('admin/users/show', {
                error: 'Algo deu errado.'
            })
        }
    },
    async delete(req, res) {
        try {
            await User.delete(req.body.id)

            req.session.success = 'Conta deletada com sucesso'
            return res.redirect('/admin/users')
        }catch(error) {
            console.error(error)
            return res.render('admin/users/show', {
                error: 'Algo deu errado.'
            })
        }
    }
}