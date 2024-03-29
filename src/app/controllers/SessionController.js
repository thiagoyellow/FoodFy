const { hash } = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const User = require('../models/User')

module.exports = {
    loginForm(req, res) {
        const { error, success } = req.session
        req.session.error = ''
        req.session.success = ''

        return res.render('admin/session/login', { error, success })
    },

    async login(req, res) {
        try {
            req.session.userId = req.user.id
            req.session.admin = req.user.is_admin
            return res.redirect(`/admin/profile/${req.session.userId}`)
        
        } catch (error) {
            console.log(error)
            return res.render('admin/profile/index', {
                error: 'Algo deu errado.'
            })
        }
    },

    logout(req, res) {
        req.session.destroy()
        return res.redirect('/login')
    },

    forgotForm(req, res) {
        req.session.destroy()
        return res.render('admin/session/password-forgot')
    },

    resetForm(req, res) {
        return res.render('admin/session/password-reset', { token: req.query.token })
    },

    async forgot(req, res) {
        try{
            const user = req.user

            const token = crypto.randomBytes(20).toString('hex')

            let now = new Date()
            now = now.setHours(now.getHours() + 1)
    
            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })
    
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Foodfy: Recuperação de senha',
                html: `<h3>Equipe Foodfy:</h3>
                <h2>Esqueceu sua senha?</h2>
                <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
                <p>
                    <a href='http://localhost:3000/password-reset?token=${token}' target='_blank'>
                       RECUPERAR SENHA
                    </a>
                </p>
                `,
            })

            return res.render('admin/session/password-forgot', {
                success: 'Verifique seu email para resetar a senha.',
    
              })

             
        
            } catch (err) {
              console.error(err)
              return res.render('admin/session/password-forgot', {
                error: 'Erro inesperado, tente novamente.',
              })
            }
          },
            
           
    
    async reset(req, res) {
        try{
            const user  = req.user
            const {  password, token } = req.body
            const newPassword = await hash(password, 8)

            await User.update(user.id, {
                password: newPassword,
                reset_token: '',
                reset_token_expires: ''
            })

            req.session.success = 'Senha atualizada.'
            return res.redirect('/login')
        }catch(error) {
            console.log(error)
            return res.render('admin/session/password-reset', {
                error: 'Algo deu errado.'
            })
        }
    }
}