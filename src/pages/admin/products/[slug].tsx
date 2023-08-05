import React, { ChangeEvent, FC, useEffect } from 'react'
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { IProducto } from '../../../interfaces/products';
import { AdminLayout } from '@/layouts/AdminLayout';
import { GetServerSideProps } from 'next'
import { getProductBySlugAllData } from '@/database/GetProductGender';
import {useForm} from 'react-hook-form'
import { useState } from 'react';
import tesloApi from '@/api/teslo_api';
import { useRouter } from 'next/router';
import Producto from '@/models/Producto';
import { useRef } from 'react';

const validTypes  = ['shirts','pants','hoodies','hats']
const validGender = ['men','women','kid','unisex']
const validSizes = ['XS','S','M','L','XL','XXL','XXXL']

interface Props {
    product: IProducto;
}

interface formData{
    _id?:string,
    titulo:string,
    descripcion:string,
    inventario:number,
    precio:number,
    tipo:string,
    gender:string,
    tallas:string[],
    slug:string,
    images:string[],
    tags:string[],
}

const ProductAdminPage:FC<Props> = ({ product }) => {


    const router=useRouter();

    const [newTag,SetNewTag]=useState<string>('');
    
    const [isSaving,SetSaving]=useState<boolean>(false);

    const FilRef=useRef<HTMLInputElement>(null);

    const {handleSubmit,register,formState:{errors},getValues,setValue,watch}=useForm<formData>({
        defaultValues:{
            _id:product._id,
            titulo:product.title,
            descripcion:product.description,
            inventario:product.inStock,
            precio:product.price,
            tipo:product.type,
            gender:product.gender,
            tallas:product.sizes,
            slug:product.slug,
            tags:product.tags,
            images:product.images
        }
    });

    const onSumbitProduct=async(value:formData)=>{

        if(value.images.length<2) return;

        SetSaving(true)

        try{

            const productToUpdate={
                _id:value._id,
                title:value.titulo,
                description:value.descripcion,
                inStock:value.inventario,
                price:value.precio,
                type:value.tipo,
                gender:value.gender,
                sizes:value.tallas,
                slug:value.slug,
                tags:value.tags,
                images:value.images
            }
            
            const {data}=await tesloApi({
                url:'/admin/productos',
                method:value._id ? 'PUT' : 'POST',
                data:productToUpdate
            })

            if(!value._id) router.replace(`/admin/products/${productToUpdate.slug}`);

            SetSaving(false);

        }catch(error){
            SetSaving(false);
            console.log(error);
        }
    }

    useEffect(()=>{
        //Se crear un observador que esta pendiente de los valores
        //Se debe borrar cuando se cierra el componente
        const subscription=watch((value,{name,type})=>{
            if(name==='titulo'){
                const newSlug=value.titulo?.trim().replaceAll(' ','_')
                .replaceAll("'","").toLocaleLowerCase() || '';
                setValue('slug',newSlug,{shouldValidate:true})
            }
        });

        return()=>{
            subscription.unsubscribe;
        }

    },[watch,setValue])



    const onDeleteTag = ( tag: string ) => {
        const tags=getValues('tags');
        setValue('tags',tags.filter(ta=>ta!=tag),{shouldValidate:true});
    }

    const onAddTag=()=>{
        const tags=getValues('tags');
        const currentTag=newTag.trim().toLocaleLowerCase();
        if(currentTag.length===0 || tags.includes(currentTag)) return SetNewTag('');
        setValue('tags',[...tags,currentTag],{shouldValidate:true});
        SetNewTag('')
    }

    const onChangeSize=(size:string)=>{
        const currentSizes=getValues('tallas');
        if(currentSizes.includes(size)){
            setValue('tallas',currentSizes.filter(sz=>sz!=size),{shouldValidate:true});
        }else{
            setValue('tallas',[...currentSizes,size],{shouldValidate:true})
        }
    }

    const onChangeImage=async({target}:ChangeEvent<HTMLInputElement>)=>{
        if(!target.files || target.files.length===0) return ;

        
        let urls:string[]=[];

        for(const file of target.files){
            const formData=new FormData();
            formData.append('file',file);
            console.log(formData);
            const {data}=await tesloApi.post<{ok:boolean,image:string}>('/admin/upload',formData);
            urls.push(data.image);
        }

        urls=[...getValues('images'),...urls]

        setValue('images',urls,{shouldValidate:true})

    }

    const onDeleteImage=(imagen:string)=>{
        const images=getValues('images').filter(img=>img!=imagen);

        setValue('images',images,{shouldValidate:true});
    }

    return (
        <AdminLayout 
            title={'Producto'} 
            subtitle={`Editando: ${ product.title }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={handleSubmit(onSumbitProduct)}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button
                        disabled={isSaving} 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('titulo', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.titulo }
                            helperText={ errors.titulo?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            {...register('descripcion',{
                                required:'Este campo es obligatorio',
                                minLength:{value:20,message:'Tamaño minimo de 20'}
                            })}
                            error={!!errors.descripcion}
                            helperText={errors.descripcion?.message}
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            {...register('inventario',{
                                required:'Este campo es obligatorio',
                            })}
                            error={!!errors.inventario}
                            helperText={errors.inventario?.message}
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            {...register('precio',{
                                required:'Este campo es obligatorio',
                                minLength:{value:4,message:'Minimo 4 caracteres'}
                            })}
                            error={!!errors.precio}
                            helperText={errors.precio?.message}
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                onChange={({target})=>setValue('tipo',target.value,{shouldValidate:true})}
                                value={getValues('tipo')}
                            >
                                {
                                    validTypes.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                // value={ status }
                                
                                onChange={({target})=>setValue('gender',target.value,{shouldValidate:true})}
                                value={getValues('gender')}
                            >
                                {
                                    validGender.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup >
                            <FormLabel>Tallas</FormLabel>
                            {
                                validSizes.map(size => (
                                    <FormControlLabel  key={size} control={<Checkbox checked={getValues('tallas').includes(size)}/>} label={ size } 
                                    onChange={()=>onChangeSize(size)}/>
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('slug',{
                                required:'Este campo es obligatorio',
                                minLength:{value:5,message:'Mas de 5 caracteres'},
                                validate:(val)=>val.trim().includes(' ') ? 'No puede tener espacios en blanco' : undefined
                            })}
                            error={!!errors.slug}
                            helperText={errors.slug?.message}
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                            value={newTag}
                            onChange={({target})=>SetNewTag(target.value)}
                            onKeyUp={({key})=>key===" " ? onAddTag() : ''}
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={()=>FilRef.current?.click()}
                            >
                                Cargar imagen
                            </Button>

                            <input onChange={onChangeImage} ref={FilRef} style={{display:'none'}} type="file" multiple accept='image/*'/>

                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                className='fadeIn'
                                sx={{display:getValues('images').length<2 ? 'flex' : 'none'}}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map( (img,index) => (
                                        <Grid item xs={4} sm={3} key={index}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                />
                                                <CardActions>
                                                    <Button onClick={()=>onDeleteImage(img)} fullWidth color="error">
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({query}) => {
    

    const {slug=''}=query;

    let producto:IProducto | null;

    if(slug.toString()!='new'){
        producto=await getProductBySlugAllData(slug.toString());
    }else{
        const tempProducto=JSON.parse(JSON.stringify(new Producto()));
        delete tempProducto._id;
        producto=tempProducto;
    }

    if(!producto){
        return {
            redirect:{
                destination:'/admin/products',
                permanent:false
            }
        }
    }

    return {
        props: {
            product:producto
        }
    }
}

export default ProductAdminPage;