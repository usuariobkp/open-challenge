
var 
    template = require("./templates/profile.hbs")
  , ProfileCard = require("./ProfileCard")
  , ProfileCardEdit = require("./ProfileCardEdit")
  , ProjectList = require("./ProjectList");

module.exports = Backbone.Marionette.Layout.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  className: "container profile-ctn",
  template: template,

  regions: {
    "profileCard": ".profile-card",
    "dashboards": ".dashboards-ctn",
    "projects": ".projects-ctn",
    "contributions": ".contributions-ctn",
    "likes": ".likes-ctn",
  },

  ui: {
    "dashboardsLen": ".dash-length",
    "projectsLen": ".proj-length",
    "contributionsLen": ".contrib-length",
    "likesLen": ".likes-length"
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){

    if (this.model.get("_id") === hackdash.user._id){
      this.profileCard.show(new ProfileCardEdit({
        model: this.model
      }));
    }
    else {
      this.profileCard.show(new ProfileCard({
        model: this.model
      }));
    }

    this.dashboards.show(new ProjectList({
      collection: this.model.get("dashboards"),
      isDashboard: true
    }));

    this.projects.show(new ProjectList({
      collection: this.model.get("projects")
    }));

    this.contributions.show(new ProjectList({
      collection: this.model.get("contributions")
    }));

    this.likes.show(new ProjectList({
      collection: this.model.get("likes")
    }));

    $('.tooltips', this.$el).tooltip({});

    this.model.get("dashboards").on("reset", this.updateCount.bind(this, "dashboards"));
    this.model.get("projects").on("reset", this.updateCount.bind(this, "projects"));
    this.model.get("contributions").on("reset", this.updateCount.bind(this, "contributions"));
    this.model.get("likes").on("reset", this.updateCount.bind(this, "likes"));

  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  updateCount: function(which){
    this.ui[which + "Len"].text(this.model.get(which).length);
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});