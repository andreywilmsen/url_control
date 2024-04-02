const express = require('express');
let Link = require('../model/Link');

let controlador = {
    get: async (req, res) => {
        let response = await Link.find();
        res.send(response);
    },
    post: async (req, res) => {

        let title = req.body.title.toLowerCase();
        let description = req.body.description;
        let url = req.body.url;

        let validation = await Link.findOne({ title });

        if (validation) {
            let response = await Link.findOneAndUpdate({ title }, { description, url });
            res.send(response)
        }
        else {
            let response = new Link({ title, description, url });
            response.save();

            res.send(response);;
        }
    },
    edit: async (req, res) => {

        let title = req.body.title.toLowerCase();
        let description = req.body.description;
        let url = req.body.url;

        let response = await Link.findOneAndUpdate({ title }, { description, url });

        res.send(response);;
    },
    delete: async (req, res) => {
        let title = req.body.title.toLowerCase();
        let response = await Link.findOneAndDelete({ title });
        res.send(response);
    },
    redirect: async (req, res) => {
        let title = req.params.title;
        if (title !== "/") {
            let response = await Link.findOne({ title });
            if (response) {
                res.redirect(response.url);
            } else {
                res.status(404).send("Link não encontrado");
            }
        }
    },
    addClick: async (req, res) => {
        let title = req.params.title;
        let response = await Link.findOneAndUpdate({ title: title }, { $inc: { click: 1 } }, { new: true });
        res.send(response);
    },
}

module.exports = controlador;