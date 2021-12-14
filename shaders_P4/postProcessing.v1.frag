#version 330 core

in vec2 texCoord;

out vec4 outColor;

uniform sampler2D colorTex;
uniform sampler2D vertexTex;

const float focalDistance = -25.0;
const float maxDistanceFactor = 1.0/5.0;

/*
// KERNEL PEQUE

const float maskFactor = float (1.0/14.0); //divides entre 14.0 porq es el numero total de pesos
// Este vector delimita cuanto nos tenemos que mover para ir a los p�xeles vecinos
// el 0,0 es el delo centro, para ir al de la esquina superior hacemos -1 en x y 1 en y
const vec2 texIdx[MASK_SIZE] = vec2[]( 
	vec2(-1.0,1.0), vec2(0.0,1.0), vec2(1.0,1.0),
	vec2(-1.0,0.0), vec2(0.0,0.0), vec2(1.0,0.0),
	vec2(-1.0,-1.0), vec2(0.0,-1.0), vec2(1.0,-1.0));

// Este vector tiene los pesos de cada uno de los pixeles vecinos.
const float mask[MASK_SIZE] = float[]( 
	float (1.0*maskFactor), float (2.0*maskFactor), float (1.0*maskFactor),
	float (2.0*maskFactor), float (2.0*maskFactor), float (2.0*maskFactor),
	float (1.0*maskFactor), float (2.0*maskFactor), float (1.0*maskFactor));

*/

//UTILIZANDO UN KERNEL M�S GRANDE

#define MASK_SIZE 25u
const vec2 texIdx[MASK_SIZE] = vec2[](
	vec2(-2.0,2.0), vec2(-1.0,2.0), vec2(0.0,2.0), vec2(1.0,2.0), vec2(2.0,2.0), 
	vec2(-2.0,1.0), vec2(-1.0,1.0), vec2(0.0,1.0), vec2(1.0,1.0), vec2(2.0,1.0), 
	vec2(-2.0,0.0), vec2(-1.0,0.0), vec2(0.0,0.0), vec2(1.0,0.0), vec2(2.0,0.0), 
	vec2(-2.0,-1.0), vec2(-1.0,-1.0), vec2(0.0,-1.0), vec2(1.0,-1.0), vec2(2.0,-1.0), 
	vec2(-2.0,-2.0), vec2(-1.0,-2.0), vec2(0.0,-2.0), vec2(1.0,-2.0), vec2(2.0,-2.0));

const float maskFactor = float (1.0/65.0);
const float mask[MASK_SIZE] = float[](
	1.0*maskFactor, 2.0*maskFactor, 3.0*maskFactor,2.0*maskFactor, 1.0*maskFactor, 
	2.0*maskFactor, 3.0*maskFactor, 4.0*maskFactor,3.0*maskFactor, 2.0*maskFactor, 
	3.0*maskFactor, 4.0*maskFactor, 5.0*maskFactor,4.0*maskFactor, 3.0*maskFactor, 
	2.0*maskFactor, 3.0*maskFactor, 4.0*maskFactor,3.0*maskFactor, 2.0*maskFactor, 
	1.0*maskFactor, 2.0*maskFactor, 3.0*maskFactor,2.0*maskFactor, 1.0*maskFactor);

void main()
{
	//Ser�a m�s r�pido utilizar una variable uniform el tama�o de la textura. 
	vec2 ts = vec2(1.0) / vec2 (textureSize (colorTex,0));
	
	float dof = abs(texture(vertexTex,texCoord).z -focalDistance) * maxDistanceFactor;
	
	dof = clamp (dof, 0.0, 1.0); // controla si emborronamos o no emborronamos
	dof *= dof;


	vec4 color = vec4 (0.0);
	for (uint i = 0u; i < MASK_SIZE; i++)
	{
		vec2 iidx = texCoord + ts * texIdx[i] * dof; 
		color += texture(colorTex, iidx,0.0) * mask[i];
	}
	
	outColor = color;

}