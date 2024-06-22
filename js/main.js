$(document).ready(function() {
    // Funciones para Clientes
    function listarClientes() {
        $.ajax({
            url: 'http://127.0.0.1:8080/clientes',
            method: 'GET',
            success: function(data) {
                var clientesTabla = $('#clientesTabla');
                clientesTabla.empty();
                data.forEach(function(cliente) {
                    clientesTabla.append(`
                        <tr>
                            <td>${cliente.id}</td>
                            <td>${cliente.nombre}</td>
                            <td>${cliente.contacto}</td>
                            <td>
                                <button class="btn btn-warning btn-sm modificarClienteBtn" data-id="${cliente.id}" data-nombre="${cliente.nombre}" data-contacto="${cliente.contacto}">Modificar</button>
                                <button class="btn btn-danger btn-sm eliminarClienteBtn" data-id="${cliente.id}">Eliminar</button>
                            </td>
                        </tr>
                    `);
                });

                $('.modificarClienteBtn').click(function() {
                    $('#modificarClienteId').val($(this).data('id'));
                    $('#modificarNombre').val($(this).data('nombre'));
                    $('#modificarContacto').val($(this).data('contacto'));
                    $('#modificarClienteModal').modal('show');
                });

                $('.eliminarClienteBtn').click(function() {
                    var id = $(this).data('id');
                    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
                        eliminarCliente(id);
                    }
                });
            },
            error: function(xhr, status, error) {
                alert('Error al obtener la lista de clientes');
            }
        });
    }

    $('#agregarClienteForm').submit(function(e) {
        e.preventDefault();
        var cliente = {
            nombre: $('#nombre').val(),
            contacto: $('#contacto').val()
        };
        $.ajax({
            url: 'http://127.0.0.1:8080/clientes',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(cliente),
            success: function() {
                $('#agregarClienteModal').modal('hide');
                listarClientes();
            },
            error: function(xhr, status, error) {
                alert('Error al agregar cliente');
            }
        });
    });

    $('#modificarClienteForm').submit(function(e) {
        e.preventDefault();
        var cliente = {
            id: parseInt($('#modificarClienteId').val(), 10),
            nombre: $('#modificarNombre').val(),
            contacto: $('#modificarContacto').val()
        };
        $.ajax({
            url: `http://127.0.0.1:8080/cliente/${cliente.id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(cliente),
            success: function() {
                $('#modificarClienteModal').modal('hide');
                listarClientes();
            },
            error: function(xhr, status, error) {
                alert('Error al modificar cliente');
            }
        });
    });

    function eliminarCliente(id) {
        $.ajax({
            url: `http://127.0.0.1:8080/cliente/${id}`,
            method: 'DELETE',
            success: function() {
                listarClientes();
            },
            error: function(xhr, status, error) {
                alert('Error al eliminar cliente');
            }
        });
    }

    listarClientes();

    // Funciones para Productos
    function listarProductos() {
        $.ajax({
            url: 'http://127.0.0.1:8080/productos',
            method: 'GET',
            success: function(data) {
                var productosTabla = $('#productosTabla');
                productosTabla.empty();
                data.forEach(function(producto) {
                    productosTabla.append(`
                        <tr>
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.categoria}</td>
                            <td>${producto.precio}</td>
                            <td>${producto.cantidad}</td>
                            <td>${producto.id_proveedor}</td>
                            <td>
                                <button class="btn btn-warning btn-sm modificarProductoBtn" data-id="${producto.id}" data-nombre="${producto.nombre}" data-categoria="${producto.categoria}" data-precio="${producto.precio}" data-cantidad="${producto.cantidad}" data-id_proveedor="${producto.id_proveedor}">Modificar</button>
                                <button class="btn btn-danger btn-sm eliminarProductoBtn" data-id="${producto.id}">Eliminar</button>
                            </td>
                        </tr>
                    `);
                });

                $('.modificarProductoBtn').click(function() {
                    $('#modificarProductoId').val($(this).data('id'));
                    $('#modificarNombreProducto').val($(this).data('nombre'));
                    $('#modificarCategoriaProducto').val($(this).data('categoria'));
                    $('#modificarPrecioProducto').val($(this).data('precio'));
                    $('#modificarCantidadProducto').val($(this).data('cantidad'));
                    $('#modificarProveedorProducto').val($(this).data('id_proveedor'));
                    $('#modificarProductoModal').modal('show');
                });

                $('.eliminarProductoBtn').click(function() {
                    var id = $(this).data('id');
                    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
                        eliminarProducto(id);
                    }
                });
            },
            error: function(xhr, status, error) {
                alert('Error al obtener la lista de productos');
            }
        });
    }

    $('#agregarProductoForm').submit(function(e) {
        e.preventDefault();
        var producto = {
            nombre: $('#nombreProducto').val(),
            categoria: $('#categoriaProducto').val(),
            precio: parseFloat($('#precioProducto').val()),
            cantidad: parseInt($('#cantidadProducto').val(), 10),
            id_proveedor: parseInt($('#proveedorProducto').val(), 10)
        };
        $.ajax({
            url: 'http://127.0.0.1:8080/productos',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(producto),
            success: function() {
                $('#agregarProductoModal').modal('hide');
                listarProductos();
            },
            error: function(xhr, status, error) {
                alert('Error al agregar producto');
            }
        });
    });

    $('#modificarProductoForm').submit(function(e) {
        e.preventDefault();
        var producto = {
            id: parseInt($('#modificarProductoId').val(), 10),
            nombre: $('#modificarNombreProducto').val(),
            categoria: $('#modificarCategoriaProducto').val(),
            precio: parseFloat($('#modificarPrecioProducto').val()),
            cantidad: parseInt($('#modificarCantidadProducto').val(), 10),
            id_proveedor: parseInt($('#modificarProveedorProducto').val(), 10)
        };
        $.ajax({
            url: `http://127.0.0.1:8080/producto/${producto.id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(producto),
            success: function() {
                $('#modificarProductoModal').modal('hide');
                listarProductos();
            },
            error: function(xhr, status, error) {
                alert('Error al modificar producto');
            }
        });
    });

    function eliminarProducto(id) {
        $.ajax({
            url: `http://127.0.0.1:8080/producto/${id}`,
            method: 'DELETE',
            success: function() {
                listarProductos();
            },
            error: function(xhr, status, error) {
                alert('Error al eliminar producto');
            }
        });
    }

    listarProductos();

    // Funciones para Proveedores
    function listarProveedores() {
        $.ajax({
            url: 'http://127.0.0.1:8080/proveedores',
            method: 'GET',
            success: function(data) {
                var proveedoresTabla = $('#proveedoresTabla');
                proveedoresTabla.empty();
                data.forEach(function(proveedor) {
                    proveedoresTabla.append(`
                        <tr>
                            <td>${proveedor.id}</td>
                            <td>${proveedor.nombre}</td>
                            <td>${proveedor.contacto}</td>
                            <td>
                                <button class="btn btn-warning btn-sm modificarProveedorBtn" data-id="${proveedor.id}" data-nombre="${proveedor.nombre}" data-contacto="${proveedor.contacto}">Modificar</button>
                                <button class="btn btn-danger btn-sm eliminarProveedorBtn" data-id="${proveedor.id}">Eliminar</button>
                            </td>
                        </tr>
                    `);
                });

                $('.modificarProveedorBtn').click(function() {
                    $('#modificarProveedorId').val($(this).data('id'));
                    $('#modificarNombreProveedor').val($(this).data('nombre'));
                    $('#modificarContactoProveedor').val($(this).data('contacto'));
                    $('#modificarProveedorModal').modal('show');
                });

                $('.eliminarProveedorBtn').click(function() {
                    var id = $(this).data('id');
                    if (confirm('¿Está seguro de que desea eliminar este proveedor?')) {
                        eliminarProveedor(id);
                    }
                });
            },
            error: function(xhr, status, error) {
                alert('Error al obtener la lista de proveedores');
            }
        });
    }

    $('#agregarProveedorForm').submit(function(e) {
        e.preventDefault();
        var proveedor = {
            nombre: $('#nombreProveedor').val(),
            contacto: $('#contactoProveedor').val()
        };
        $.ajax({
            url: 'http://127.0.0.1:8080/proveedores',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(proveedor),
            success: function() {
                $('#agregarProveedorModal').modal('hide');
                listarProveedores();
            },
            error: function(xhr, status, error) {
                alert('Error al agregar proveedor');
            }
        });
    });

    $('#modificarProveedorForm').submit(function(e) {
        e.preventDefault();
        var proveedor = {
            id: parseInt($('#modificarProveedorId').val(), 10),
            nombre: $('#modificarNombreProveedor').val(),
            contacto: $('#modificarContactoProveedor').val()
        };
        $.ajax({
            url: `http://127.0.0.1:8080/proveedor/${proveedor.id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(proveedor),
            success: function() {
                $('#modificarProveedorModal').modal('hide');
                listarProveedores();
            },
            error: function(xhr, status, error) {
                alert('Error al modificar proveedor');
            }
        });
    });

    function eliminarProveedor(id) {
        $.ajax({
            url: `http://127.0.0.1:8080/proveedor/${id}`,
            method: 'DELETE',
            success: function() {
                listarProveedores();
            },
            error: function(xhr, status, error) {
                alert('Error al eliminar proveedor');
            }
        });
    }

    listarProveedores();

    // Funciones para Ventas
    function listarVentas() {
        $.ajax({
            url: 'http://127.0.0.1:8080/ventas',
            method: 'GET',
            success: function(data) {
                var ventasTabla = $('#ventasTabla');
                ventasTabla.empty();
                data.forEach(function(venta) {
                    ventasTabla.append(`
                        <tr>
                            <td>${venta.id}</td>
                            <td>${venta.id_producto}</td>
                            <td>${venta.id_cliente}</td>
                            <td>${venta.cantidad}</td>
                            <td>${venta.total}</td>
                            <td>${venta.fecha}</td>
                        </tr>
                    `);
                });
            },
            error: function(xhr, status, error) {
                alert('Error al obtener la lista de ventas');
            }
        });
    }

    $('#agregarVentaForm').submit(function(e) {
        e.preventDefault();
        var venta = {
            id_producto: parseInt($('#idProductoVenta').val(), 10),
            id_cliente: parseInt($('#idClienteVenta').val(), 10),
            cantidad: parseInt($('#cantidadVenta').val(), 10),
            fecha: $('#fechaVenta').val()
        };
        $.ajax({
            url: 'http://127.0.0.1:8080/ventas',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(venta),
            success: function() {
                $('#agregarVentaModal').modal('hide');
                listarVentas();
            },
            error: function(xhr, status, error) {
                alert('Error al agregar venta');
            }
        });
    });

    listarVentas();

    // Navegación entre secciones
    $('a.nav-link').click(function(e) {
        e.preventDefault();
        $('div.container.mt-5').addClass('d-none');
        var target = $(this).attr('href');
        $(target).removeClass('d-none');
    });
});

