#version 330 core

in vec2 texCoord;

out vec4 outColor;

uniform sampler2D colorTex;

void main()
{
	//NOTA: Sería más adecuado usar texelFetch.
	//NOTA: No lo hacemos porque simplifica el paso 5
	outColor = vec4(textureLod(colorTex, texCoord,0).xyz, 0.6);
	//outColor = vec4(texCoord,vec2(1.0));

}