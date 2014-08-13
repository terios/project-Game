'use strict';

/**
 * @ngdoc function
 * @name projectGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectGameApp
 */
angular.module('projectGameApp')
    .controller('MainCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


        var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameCanvasPlace', { preload: preload, create: create, update: update });
        $scope.score = 0;
        $scope.scoreText;
        function preload() {
            console.log('preload');
            $scope.game = game;
            $scope.game.load.image('sky', 'images/staticDecor/world.png');
            $scope.game.load.image('ground', 'images/staticDecor/platform.png');
            $scope.game.load.image('mushroom', 'images/items/star.png');
            $scope.game.load.spritesheet('dude', 'images/character/dude.png', 32, 48);
        }

        function create() {
            console.log('create');
            $scope.game.physics.startSystem(Phaser.Physics.ARCADE);
            $scope.game.add.sprite(0, 0, 'sky');
            $scope.platforms = game.add.group();
            $scope.platforms.enableBody = true;
            $scope.ground = $scope.platforms.create(0, $scope.game.world.height - 144, 'ground');
            $scope.ground.scale.setTo(2, 2);
            $scope.ground.body.immovable = true;
            $scope.ledge = $scope.platforms.create(400, 350, 'ground');

            $scope.scoreText = $scope.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

            $scope.ledge.body.immovable = true;

            $scope.ledge = $scope.platforms.create(-150, 250, 'ground');

            $scope.ledge.body.immovable = true;


            $scope.player = $scope.game.add.sprite(32, $scope.game.world.height - 230, 'dude');

            //  We need to enable physics on the player
            $scope.game.physics.arcade.enable($scope.player);

            //  Player physics properties. Give the little guy a slight bounce.
            $scope.player.body.bounce.y = 0.2;
            $scope.player.body.gravity.y = 500;
            $scope.player.body.collideWorldBounds = true;

            //  Our two animations, walking left and right.
            $scope.player.animations.add('left', [0, 1, 2, 3], 10, true);
            $scope.player.animations.add('right', [5, 6, 7, 8], 10, true);

            $scope.cursors = $scope.game.input.keyboard.createCursorKeys();

            $scope.mushrooms = $scope.game.add.group();

            $scope.mushrooms.enableBody = true;

            //  Here we'll create 12 of them evenly spaced apart
            for (var i = 0; i < 6; i++) {
                //  Create a star inside of the 'stars' group
                var mushroom = $scope.mushrooms.create(i * 100, 0, 'mushroom');

                //  Let gravity do its thing
                mushroom.body.gravity.y = 100;

                //  This just gives each star a slightly random bounce value
                mushroom.body.bounce.y = 0.1 + Math.random() * 0.2;
            }

        }

        function update() {
            $scope.game.physics.arcade.collide($scope.player, $scope.platforms);
            $scope.game.physics.arcade.collide($scope.mushrooms, $scope.platforms);
            $scope.game.physics.arcade.overlap($scope.player, $scope.mushrooms, collectStar, null, this);

            function collectStar(player, mushroom) {

                // Removes the star from the screen
                mushroom.kill();
                $scope.score += 10;
                $scope.scoreText.text = 'Score: ' + $scope.score;
                if ($scope.score === 60) {
                    $scope.scoreText = $scope.game.add.text(60, 60, 'finished', { fontSize: '52px', fill: '#7550CB' });
                }

            }

            $scope.player.body.velocity.x = 0;

            if ($scope.cursors.left.isDown) {
                console.log('left');

                //  Move to the left
                $scope.player.body.velocity.x = -150;

                $scope.player.animations.play('left');
            }
            else if ($scope.cursors.right.isDown) {
                console.log('rignt');
                //  Move to the right
                $scope.player.body.velocity.x = 150;

                $scope.player.animations.play('right');
            }
            else {
                //  Stand still
                $scope.player.animations.stop();

                $scope.player.frame = 4;
            }

            //  Allow the player to jump if they are touching the ground.
            if ($scope.cursors.up.isDown && $scope.player.body.touching.down) {
                $scope.player.body.velocity.y = -350;
            }
        }
    });
