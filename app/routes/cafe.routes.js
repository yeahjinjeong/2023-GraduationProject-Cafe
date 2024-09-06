module.exports = (app) => {
  const cafes = require("../controller/cafe.controller.js");

  // 전체 조회
  app.get("/cafe", cafes.findAll);
  
  app.get("/brunch", cafes.findBrunch);
  app.get("/coffee", cafes.findCoffee);
  app.get("/tea", cafes.findTea);
  app.get("/dessert", cafes.findDessert);
  app.get("/vegan", cafes.findVegan);
  app.get("/study", cafes.findStudy);
  app.get("/team", cafes.findTeam);
  app.get("/large", cafes.findLarge);
  app.get("/chat", cafes.findChat);
  app.get("/child", cafes.findChild);
  app.get("/senior", cafes.findSenior);
  app.get("/party", cafes.findParty);
  app.get("/sns", cafes.findSns);
  app.get("/rest", cafes.findRest);
  app.get("/theme", cafes.findTheme);

  app.get("/americano", cafes.findAmericano);
  app.get("/latte", cafes.findLatte);

  app.get("/review", cafes.findReview);
};
