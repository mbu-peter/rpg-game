import * as THREE from 'three'

export class Terrain extends THREE.Mesh{
    constructor(width, height){
        super();
        this.width = width
        this.height = height
        this.treeCount = 20

        this.createGeometry()
        this.material = new THREE.MeshStandardMaterial({color: 'red'})
        this.rotation.x = -Math.PI /2
        this.createTrees()
    }

    createGeometry(){
        this.geometry?.dispose();
        this.geometry = new THREE.PlaneGeometry(this.width, this.height)
        this.position.set(this.width/2, 0, this.height/2,0)
    }
    createTrees(){
        for (let i=0; i<this.treeCount; i++){
            const treeGeometry = new THREE.ConeGeometry(0.1, 0.5)
            const treeMaterial = new THREE.MeshStandardMaterial({color: "red"})
            const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial)

            this.add(treeMesh)
        }
    }
    
}