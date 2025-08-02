        // Simple Three.js background animation
        const canvas = document.getElementById('canvas3d');
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Create floating geometry
        const geometries = [
            new THREE.IcosahedronGeometry(0.5),
            new THREE.OctahedronGeometry(0.4),
            new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16)
        ];
        
        const objects = [];
        
        for (let i = 0; i < 20; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshPhongMaterial({
                color: 0x5e6ad2,
                transparent: true,
                opacity: 0.6,
                shininess: 100,
                specular: 0x222222
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Random position
            mesh.position.x = (Math.random() - 0.5) * 10;
            mesh.position.y = (Math.random() - 0.5) * 10;
            mesh.position.z = (Math.random() - 0.5) * 10;
            
            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            // Random scale
            const scale = 0.5 + Math.random() * 0.5;
            mesh.scale.set(scale, scale, scale);
            
            // Store to animate later
            objects.push({
                mesh,
                speedX: Math.random() * 0.01 - 0.005,
                speedY: Math.random() * 0.01 - 0.005,
                speedZ: Math.random() * 0.01 - 0.005
            });
            
            scene.add(mesh);
        }
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            objects.forEach(obj => {
                obj.mesh.rotation.x += obj.speedX;
                obj.mesh.rotation.y += obj.speedY;
                obj.mesh.rotation.z += obj.speedZ;
                
                // Gentle floating movement
                obj.mesh.position.y += Math.sin(Date.now() * 0.001 + obj.mesh.position.x) * 0.001;
            });
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });