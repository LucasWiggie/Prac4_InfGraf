#version 330 core

// ENTRADA:
in vec3 inPos;	

// SALIDA:
out vec2 texCoord; //pasamos las coordenadas de texturas

void main()
{
	texCoord = inPos.xy*0.5+vec2(0.5);
	gl_Position = vec4 (inPos,1.0);

}
