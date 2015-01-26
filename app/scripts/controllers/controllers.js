"use strict"

var app = angular.module("WeShare", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider.
		when("/", {
			controller: "articlesController",
			templateUrl: "/views/articlesContent.html"
		}).
		when("/views/:type", {
			controller: "articlesController",
			templateUrl: "/views/articlesContent.html"
		}).
		otherwise({
			redirectTo : ""
		});
});

var articles = [
					{
						title: "title1", 
						brief: "This is a article content brief, it shows you a very simple introduction of the article.",
						photo: "photo.png",
						authorphoto: "authorPhoto.png",
						userName: "David",
						userKey: "David123123123",
						date: "2015-1-25"
					},
					{
						title: "title2", 
						brief: "This is a article content brief.",
						photo: "photo.png",
						authorphoto: "authorPhoto.png",
						userName: "David",
						userKey: "David123123123",
						date: "2015-1-25"
					},
					{
						title: "title3", 
						brief: "This is a article content brief, it shows you a very simple introduction of the article.",
						photo: "photo.png",
						authorphoto: "authorPhoto.png",
						userName: "David",
						userKey: "David123123123",
						date: "2015-1-25"
					},
					{
						title: "title4", 
						brief: "This is a article content brief, it shows you a very simple introduction of the article.",
						photo: "photo.png",
						authorphoto: "authorPhoto.png",
						userName: "David",
						userKey: "David123123123",
						date: "2015-1-25"
					}
				];

app.controller("navController", ["$scope", function($scope) {
	$scope.navItems = [
						{title: "精选", key: "main"},
						{title: "文化", key: "culture"},
						{title: "幽默", key: "humour"},
						{title: "科技", key: "tech"},
						{title: "设计", key: "design"}
					];
}]);

app.controller("articlesController", ["$scope", function($scope, $routeParams) {

	$scope.articles = articles;

}]);

app.controller("hotArticlesController",["$scope", function($scope){
	$scope.hotArticles = [
						{
							title: "Holy Shit, I Interviewed the President",
							authorName: "Hank Green",
							index: 1
						},
						{
							title: "Age 40: Ain’t Nobody Got Time For That",
							authorName: "Amanda Clayman",
							index: 2
						},
						{
							title: "Eleven Ways to Surprise People with Your Ou",
							authorName: "Britton MDG",
							index: 3
						},
						{
							title: "Tech’s High Barrier to Entry for the Underpri",
							authorName: "Gerard O'Neill",
							index: 4
						},
						{
							title: "I was forced into a long distance relationshi",
							authorName: "Jeremy Schoenherr",
							index: 5
						}
					];
}]);
