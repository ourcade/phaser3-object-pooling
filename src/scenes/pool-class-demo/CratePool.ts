import Phaser from 'phaser'

const KEY_CRATE = 'crate'

export default class CratePool extends Phaser.GameObjects.Group implements ICratePool
{
	constructor(scene: Phaser.Scene, config: Phaser.Types.GameObjects.Group.GroupConfig = {})
	{
		const defaults: Phaser.Types.GameObjects.Group.GroupConfig = {
			classType: Phaser.GameObjects.Image,
			maxSize: -1
		}

		super(scene, Object.assign(defaults, config))
	}

	initializeWithSize(size: number)
	{
		if (this.getLength() > 0 || size <= 0)
		{
			return
		}

		this.createMultiple({
			key: KEY_CRATE,
			quantity: size,
			visible: false,
			active: false
		})
	}

	spawn(x = 0, y = 0, key: string = KEY_CRATE)
	{
		const crate: Phaser.GameObjects.Image = this.get(x, y, KEY_CRATE)

		crate.setVisible(true)
		crate.setActive(true)

		return crate
	}

	despawn(crate: Phaser.GameObjects.Image)
	{
		this.killAndHide(crate)

		crate.alpha = 1
		crate.scale = 1
	}
}

Phaser.GameObjects.GameObjectFactory.register('cratePool', function () {
	// @ts-ignore
	return this.updateList.add(new CratePool(this.scene));
})

export {
	KEY_CRATE
}
