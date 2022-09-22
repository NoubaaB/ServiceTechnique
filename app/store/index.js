import Sqlite from "nativescript-sqlite";
import Vue from 'nativescript-vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        database: null,
        section :null,
        sections :[],
        model :null,
        models :[],
        fillier :null,
        filliers :[],
    },
    mutations: {
        init(state , database) {
            state.database = database;
        },
        load(state , sections) {
            console.log("load", state.sections, sections)
            console.log(sections)
            state.sections = [];
            sections.forEach(s => {
                state.sections.push({
                    id : s[0],
                    name : s[1],
                    model_id : s[2],
                })
            })
            console.log("after load", state.sections)

        },
        addSection : (state,section)=>{
            state.sections.push(section);
        },
        deleteSection : (state,section)=>{
            let index = state.sections.findIndex(s=>s.id==section.id);
            state.sections.splice(index , 1)
        },
        updateSection: (state, section) => {
            let _section = state.sections.find(s=>s.id==section.id);
            _section = { ...section };
        },
        addModel : (state,model)=>{
            state.models.push(model);
        },
        deleteModel : (state,model)=>{
            let index = state.models.findIndex(s=>s.id==model.id);
            state.models.splice(index , 1)
        },
        updateModel: (state, model) => {
            let _model = state.models.find(s=>s.id==model.id);
            _model = { ...model };
        },
        addFillier : (state,fillier)=>{
            state.filliers.push(fillier);
        },
        deleteFillier : (state,fillier)=>{
            let index = state.filliers.findIndex(s=>s.id==fillier.id);
            state.filliers.splice(index , 1)
        },
        updateModel: (state, model) => {
            let _model = state.models.find(s=>s.id==model.id);
            _model = { ...model };
        },
    },
    actions: {
        init({ commit, dispatch, state }) {
            // if (Sqlite.exists("testament")) {
            //     Sqlite.deleteDatabase("testament");
            // }
            (new Sqlite("testament")).then(db => {
                db.execSQL("CREATE TABLE IF NOT EXISTS sections (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, module_id INTEGER NULL)").then(id => {
                    commit("init", db);
                    console.log('database init',db , state.database )
                    dispatch("query")
                }, error => {
                    console.log("CREATE TABLE ERROR", error);
                });
            }, error => {
                console.log("OPEN DB ERROR", error);
            });
        },
        query({commit , state}) {
            state.database.all("SELECT * FROM sections", []).then(result => {
                commit("load", result);
            }, error => {
                console.log("SELECT ERROR", error);
            });
        },
        addSection: ({ commit , state }, section) => {
            state.database.execSQL("INSERT INTO sections (name) VALUES (?)", [section.name]).then(id => {
                section.id = id;
                section.model_id = modul_id;
                commit("addSection", section);
            }, error => {
                console.log("INSERT ERROR", error);
            });
            // commit("addSection", section);
        },
        deleteSection : ({ commit},section)=>{
            commit("deleteSection", section);
        },
        updateSection : ({ commit},section)=>{
            commit("updateSection", section);
        },
        addModel : ({ commit},model)=>{
            commit("addModel", model);
        },
        deleteModel : ({ commit},model)=>{
            commit("deleteModel", model);
        },
        updateModel : ({ commit},model)=>{
            commit("updateModel", model);
        },
        addFillier : ({ commit},fillier)=>{
            commit("addFillier", fillier);
        },
        deleteFillier : ({ commit},fillier)=>{
            commit("deleteFillier", fillier);
        },
        updateFillier : ({ commit},fillier)=>{
            commit("updateFillier", fillier);
        },
    }
})