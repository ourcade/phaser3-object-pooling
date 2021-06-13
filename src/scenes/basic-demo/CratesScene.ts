import Phaser from 'phaser'

const KEY_CRATE = 'crate'
const INFO_FORMAT = 
`Size:       %1
Spawned:    %2
Despawned:  %3`

export default class CratesScene extends Phaser.Scene
{
	private group?: Phaser.GameObjects.Group
	private infoText?: Phaser.GameObjects.Text

	constructor()
	{
		super('crates-scene-basic')
	}

	preload()
	{
		this.load.image(KEY_CRATE, 'assets/crate.png')
	}

	create()
	{
		this.group = this.add.group({
			defaultKey: KEY_CRATE
		})

		// this.group.createMultiple({
		// 	key: KEY_CRATE,
		// 	quantity: 5,
		// 	visible: false,
		// 	active: false
		// })

		this.input.on(Phaser.Input.Events.POINTER_DOWN, pointer => {
			this.spawnCrate(pointer.x, pointer.y)
		})

		this.infoText = this.add.text(16, 16, '')
	}

	update()
	{
		if (!this.group || !this.infoText)
		{
			return
		}

		const size = this.group.getLength()
		const used = this.group.getTotalUsed()
		const text = Phaser.Utils.String.Format(
			INFO_FORMAT,
			[
				size,
				used,
				size - used
			]
		)

		this.infoText.setText(text)
	}

	private spawnCrate(x = 400, y = 300)
	{
		if (!this.group)
		{
			return null
		}

		const crate: Phaser.GameObjects.Sprite = this.group.get(x, y, KEY_CRATE)

		crate.alpha = 1
		crate.scale = 1
		crate.setVisible(true)
		crate.setActive(true)

		this.tweens.add({
			targets: crate,
			scale: 2,
			alpha: 0,
			duration: Phaser.Math.Between(500, 1500),
			onComplete: (tween) => {
				this.group!.killAndHide(crate)
				this.tweens.killTweensOf(crate)
			}
		})

		return crate
	}
}