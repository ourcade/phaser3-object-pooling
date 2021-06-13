// import Phaser from 'phaser'
import 'phaser'

// import CratesScene from './scenes/basic-demo/CratesScene'
// import CratesScene from './scenes/pool-class-demo/CratesScene'
import CratesScene from './scenes/physics-demo/CratesScene'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
		matter: {
			debug: true
		}
	},
	scene: [CratesScene]
}

export default new Phaser.Game(config)
