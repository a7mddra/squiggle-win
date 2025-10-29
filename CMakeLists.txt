cmake_minimum_required(VERSION 3.16)
project(SpatialShot VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTORCC ON)

# This will find the Qt installation from CMAKE_PREFIX_PATH
# (which we set in the build.yml)
find_package(Qt6 REQUIRED COMPONENTS Core Gui Widgets)

add_executable(spatialshot
    WIN32
    src/main.cpp
    src/Window.cpp
    src/Window.h
)

target_link_libraries(spatialshot PRIVATE
    Qt::Core
    Qt::Gui
    Qt::Widgets
    dwmapi # For your DWMWA_TRANSITIONS_FORCEDISABLED
)

target_include_directories(spatialshot PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src
)

# Install step for windeployqt to find the binary easily
# (This isn't strictly needed for the YAML above, but it's good practice)
install(TARGETS spatialshot
    RUNTIME DESTINATION bin
)

if(CMAKE_SYSTEM_NAME STREQUAL "Windows")
    set_target_properties(spatialshot PROPERTIES
        VERSION ${PROJECT_VERSION}
        DESCRIPTION "A cross-platform screenshot utility."
    )
endif()