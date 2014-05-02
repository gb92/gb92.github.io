/**
 * GBFinalRenderer.js
 * JavaScript code for CSe7382 Final Project
 * Gavin Benedict 2014
 */

var renderer, scene, camera, controls, stats, materials=[];

var WIDTH, HEIGHT;

var cube;

init();
animate();

function init()
{
    WIDTH=window.innerWidth;
    HEIGHT=window.innerHeight;

    renderer=new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    scene=new THREE.Scene();
    scene.fog= new THREE.FogExp2( 0x000000, 0.0007 );

    camera=new THREE.PerspectiveCamera(
        35,
        WIDTH/HEIGHT,
        0.1,
        10000
    );

    camera.position.set(-15, 10, 10);

    camera.lookAt(scene.position);
    scene.add(camera);

    // Set the background color of the scene.
    renderer.setClearColor(0xFFFFFF, 1);

    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);

    light = new THREE.PointLight(0xffffff);
    light.position.set(100,200,-100);
    scene.add(light);


    //snowman base
    var geometry=//new THREE.CubeGeometry(5, 5, 5);
     new THREE.SphereGeometry(1, 25, 25, 0, 2*Math.PI, 0, 2*Math.PI);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -1, 0));
    var material= new THREE.MeshLambertMaterial(
        {
            color:0xFFFFFF,
            map:THREE.ImageUtils.loadTexture('assets/snow_texture.jpg')
        });
    var mesh= new THREE.Mesh(geometry, material);

    scene.add(mesh);

    //snowman middle
    geometry=new THREE.SphereGeometry(.75, 25, 25, 0, 2*Math.PI, 0, 2*Math.PI);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    mesh=new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //snowman head
    geometry=new THREE.SphereGeometry(.35, 25, 25, 0, 2*Math.PI, 0, 2*Math.PI);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1, 0));
    mesh=new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //snowman arms

    var cylinder=new THREE.CylinderGeometry(.1, .1, .75, 25, 15, false);
    cylinder.applyMatrix(new THREE.Matrix4());
    var armMaterial=new THREE.MeshLambertMaterial(
    {
        color:0xFFFFFF,
        map:THREE.ImageUtils.loadTexture('assets/wood_texture.jpeg')
    });
    var armMesh= new THREE.Mesh(cylinder, armMaterial);
    armMesh.rotation.x=-.45*Math.PI;
    armMesh.position.y=.35;
    armMesh.position.z=.75;
    scene.add(armMesh);

    cylinder=new THREE.CylinderGeometry(.1, .1, .75, 25, 15, false);
    cylinder.applyMatrix(new THREE.Matrix4());
    armMesh= new THREE.Mesh(cylinder, armMaterial);
    armMesh.rotation.x=-.45*Math.PI;
    armMesh.position.y=.35;
    armMesh.position.z=-.75;
    scene.add(armMesh);


    //particle stuff
    geometry = new THREE.Geometry();

    for ( i = 0; i < 20000; i ++ ) {

        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Math.random() * 2000 - 1000;
        vertex.z = Math.random() * 2000 - 1000;

        geometry.vertices.push( vertex );

    }

    parameters = [
        [ [1, 1, 0.5], 5 ],
        [ [1, 1, 0.5], 4 ],
        [ [1, 1, 0.5], 3 ],
        [ [1, 1, 0.5], 2 ],
        [ [1, 1, 0.5], 1 ]
    ];

    for ( i = 0; i < parameters.length; i ++ ) {

        color = parameters[i][0];
        size  = parameters[i][1];

        materials[i] = new THREE.ParticleSystemMaterial( { size: size } );

        particles = new THREE.ParticleSystem( geometry, materials[i] );

        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;

        scene.add( particles );

    }


    controls=THREE.OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    stats=new Stats();
    stats.setMode(0);
    document.body.appendChild(stats.domElement);
}

function animate()
{
    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);
    var time = Date.now() * 0.00005;
    for ( i = 0; i < scene.children.length; i ++ ) {

        var object = scene.children[ i ];

        if ( object instanceof THREE.ParticleSystem ) {

            object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

        }

    }

    for ( i = 0; i < materials.length; i ++ ) {

        color = parameters[i][0];

        h = 1;//( 360 * ( color[0] + time ) % 360 ) / 360;
        //materials[i].color.setHSL( h, color[1], color[2] );
        materials[i].color.setHSL(1, 1, 1 );
    }


    //scene=new THREE.Scene();
    // Render the scene.
    renderer.render(scene, camera);

    controls.update();
    stats.update();


}


